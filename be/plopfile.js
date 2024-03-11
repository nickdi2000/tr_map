module.exports = function (plop) {
  plop.setGenerator('controller', {
    description: 'Generate a new controller',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Controller name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/controllers/{{name}}.controller.js',
        templateFile: 'templates/controller.hbs',
      },
    ],
  });

  plop.setGenerator('service', {
    description: 'Generate a new service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Service name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/services/{{name}}.service.js',
        templateFile: 'templates/service.hbs',
      },
    ],
  });

  plop.setGenerator('model', {
    description: 'Generate a new model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Model name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/models/{{name}}.model.js',
        templateFile: 'templates/model.hbs',
      },
    ],
  });
};
