
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        {
          title: "Pacific NW Backpacking",
          user_id: 1 , 
          shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac.", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac. Ut malesuada massa felis, at fermentum lectus interdum et. Nulla auctor eget felis id convallis. Quisque sed eleifend arcu, id eleifend est. Ut ut viverra nisi. Integer sed ipsum sodales, faucibus massa et, cursus elit. Vivamus efficitur ex neque, nec rutrum dui euismod eu. Nam quis nisl at leo pharetra lacinia eget eget mauris. Nullam feugiat augue arcu, ac tristique velit lobortis ut. Integer sed ante ac purus efficitur ultrices sed at leo. Sed in lectus vitae felis imperdiet rutrum ac vitae erat. Integer facilisis vel augue sit amet finibus. Suspendisse potenti. Sed sed nisl id nisl pulvinar hendrerit eu vel tortor. Fusce eu ultrices lectus, eu efficitur eros. Pellentesque rutrum hendrerit nisl nec euismod. Sed varius auctor pharetra. Donec auctor erat lectus, non cursus lorem tincidunt eget. In urna neque, ultrices sed cursus eget, elementum eu mauris. In quis nisi quis eros semper scelerisque vel ac lectus. Phasellus consectetur feugiat risus in dictum. Suspendisse auctor sapien sed odio placerat, sed pharetra justo semper. Morbi nec diam pretium, rhoncus diam eu, molestie risus.",
          isProfessional: false,
          type: 1,
          duration: 3,
          distance: 300,
          date: '2018-11-01',
          image: "https://images.pexels.com/photos/12057/pexels-photo-12057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          title: "Scuba Diving",
          user_id: 2 , 
          shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac.", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac. Ut malesuada massa felis, at fermentum lectus interdum et. Nulla auctor eget felis id convallis. Quisque sed eleifend arcu, id eleifend est. Ut ut viverra nisi. Integer sed ipsum sodales, faucibus massa et, cursus elit. Vivamus efficitur ex neque, nec rutrum dui euismod eu. Nam quis nisl at leo pharetra lacinia eget eget mauris. Nullam feugiat augue arcu, ac tristique velit lobortis ut. Integer sed ante ac purus efficitur ultrices sed at leo. Sed in lectus vitae felis imperdiet rutrum ac vitae erat. Integer facilisis vel augue sit amet finibus. Suspendisse potenti. Sed sed nisl id nisl pulvinar hendrerit eu vel tortor. Fusce eu ultrices lectus, eu efficitur eros. Pellentesque rutrum hendrerit nisl nec euismod. Sed varius auctor pharetra. Donec auctor erat lectus, non cursus lorem tincidunt eget. In urna neque, ultrices sed cursus eget, elementum eu mauris. In quis nisi quis eros semper scelerisque vel ac lectus. Phasellus consectetur feugiat risus in dictum. Suspendisse auctor sapien sed odio placerat, sed pharetra justo semper. Morbi nec diam pretium, rhoncus diam eu, molestie risus.",
          isProfessional: false,
          type: 1,
          duration: 1,
          date: '2018-6-01',
          image: "https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          title: "Pacific NW Backpacking",
          user_id: 3 , 
          shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac.", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac. Ut malesuada massa felis, at fermentum lectus interdum et. Nulla auctor eget felis id convallis. Quisque sed eleifend arcu, id eleifend est. Ut ut viverra nisi. Integer sed ipsum sodales, faucibus massa et, cursus elit. Vivamus efficitur ex neque, nec rutrum dui euismod eu. Nam quis nisl at leo pharetra lacinia eget eget mauris. Nullam feugiat augue arcu, ac tristique velit lobortis ut. Integer sed ante ac purus efficitur ultrices sed at leo. Sed in lectus vitae felis imperdiet rutrum ac vitae erat. Integer facilisis vel augue sit amet finibus. Suspendisse potenti. Sed sed nisl id nisl pulvinar hendrerit eu vel tortor. Fusce eu ultrices lectus, eu efficitur eros. Pellentesque rutrum hendrerit nisl nec euismod. Sed varius auctor pharetra. Donec auctor erat lectus, non cursus lorem tincidunt eget. In urna neque, ultrices sed cursus eget, elementum eu mauris. In quis nisi quis eros semper scelerisque vel ac lectus. Phasellus consectetur feugiat risus in dictum. Suspendisse auctor sapien sed odio placerat, sed pharetra justo semper. Morbi nec diam pretium, rhoncus diam eu, molestie risus.",
          isProfessional: false,
          type: 1,
          duration: 3,
          distance: 400,
          date: '2018-11-01',
          image: "https://images.pexels.com/photos/12057/pexels-photo-12057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
      ]);
    });
};
