'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const checkTakePlaceShift = (samedayShifts, startTime, endTime) => {
  for (let i = 0; i < samedayShifts.length; i++) {
    const shiftStartHour = samedayShifts[i].startTime.split(':')[0];
    const shiftEndHour = samedayShifts[i].endTime.split(':')[0];
    const startHour = startTime.split(':')[0];
    const endHour = endTime.split(':')[0];
    if ((startHour >= shiftStartHour && startHour <= shiftEndHour)
      || (endHour >= shiftStartHour && endHour <= shiftEndHour)) {
      return true;
    }
  }
};

module.exports = {
  async create(ctx) {
    try {
      const { week, date, startTime, endTime } = ctx.request.body;

      // check published week
      if (await strapi.services.shift.findOne({ week, status: 'published' })) {
        return ctx.response.badRequest('This week is published!');
      }

      // check take place shift
      const samedayShifts = await strapi.services.shift.find({ date });

      if (checkTakePlaceShift(samedayShifts, startTime, endTime)) {
        return ctx.response.badRequest('There\'s another shift taking place!');
      }

      return await strapi.services.shift.create({ ...ctx.request.body });
    } catch (error) {
      return ctx.response.badImplementation(error);
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { date, startTime, endTime } = ctx.request.body;
      // check take place shift
      const samedayShifts = await strapi.services.shift.find({
        date,
        'id_ne': id
      });

      if (checkTakePlaceShift(samedayShifts, startTime, endTime)) {
        return ctx.response.badRequest('There\'s another shift taking place!');
      }

      return await strapi.services.shift.update({ id }, { ...ctx.request.body });
    } catch (error) {
      return ctx.response.badImplementation(error);
    }
  },

  async publish(ctx) {
    try {
      const { shifts } = ctx.request.body;

      return await Promise.all(
        shifts.map(async (id) => await strapi.services.shift.update({ id }, { status: 'published' }))
      );
    } catch (error) {
      return ctx.response.badImplementation(error);
    }
  }
};
