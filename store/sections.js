export const state = () => ({
  selected: null,
  sections: [
    {
      id: 1,
      name: "Powers Wall",
      type: "roped",
      routes: [
        {
          name: "Ringus Bingus",
          grade: "5.10a",
          color: "Pink",
          setter: "Sif",
          id: 1
        },
        {
          name: "Stabby Shabby",
          grade: "5.10b",
          color: "Orange",
          setter: "Sif",
          id: 2
        },
        {
          name: "Stabby Acres",
          grade: "5.12b",
          color: "Pink",
          setter: "Sif",
          id: 3
        }
      ]
    },
    {
      id: 2,
      name: "Valhala",
      type: "roped",
      routes: [
        {
          name: "Ringus Bingus",
          grade: "5.10a",
          color: "Pink",
          setter: "Sif",
          id: 4
        },
        {
          name: "Stabby Acres",
          grade: "5.10b",
          color: "Orange",
          setter: "Sif",
          id: 5
        },
        {
          name: "Shifty Bones",
          grade: "5.12b",
          color: "Pink",
          setter: "Sif",
          id: 6
        }
      ]
    },
    {
      id: 3,
      name: "Circus Wall",
      type: "roped",
      routes: [
        {
          name: "Change Soul",
          grade: "5.11a",
          color: "Blue",
          setter: "Solaire",
          id: 7
        },
        {
          name: "Praise the Sun",
          grade: "5.10b",
          color: "Orange",
          setter: "Solaire",
          id: 8
        },
        {
          name: "Stabby Acres",
          grade: "5.12b",
          color: "Pink",
          setter: "Sif",
          id: 9
        }
      ]
    }
  ]
});
export const getters = () => ({});
export const actions = {};
export const mutations = {
  add(state, payload) {
    state.selected = payload;
  },
  addRoute(state, { route, theSection }) {
    state.sections.forEach(section => {
      if (section.name === theSection) {
        section.routes.push(route);
      }
    });
  },
  deleteRoute(state, payload) {
    payload.forEach(load => {
      state.sections.forEach(section => {
        section.routes = section.routes.filter(route => {
          return route.id !== load;
        });
      });
    });
  }
};
