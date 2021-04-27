'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // async create(ctx) {

  // },

  // async find(ctx) {

  // },

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
