'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  writing: {
    prompting: function () {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ultimate ' + chalk.red('grunt-aws-lambda') + ' generator!'
      ));

      this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What name would you like to give your Lambda function?',
          default: 'my-lambda-function'
        },
        {
          type: 'input',
          name: 'arn',
          message: 'What is the ARN of your Lambda function (optional)?'
        }
      ], function (answers) {
        this.props = answers;
        done();
      }.bind(this));
    },
    files: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copy(
        this.templatePath('_index.js'),
        this.destinationPath('index.js')
      );
      this.fs.copy(
        this.templatePath('_.npmignore'),
        this.destinationPath('.npmignore')
      );
      this.fs.copy(
        this.templatePath('_event.json'),
        this.destinationPath('event.json')
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this.props
      );
    },
    grunt: function () {
      this.gruntfile.loadNpmTasks('grunt-aws-lambda');
      this.gruntfile.insertConfig('lambda_invoke', '{ default : {} }');
      this.gruntfile.insertConfig('lambda_package', '{ default : {} }');
      this.gruntfile.insertConfig('lambda_deploy', '{ default : { ' + (this.props.arn ? ('arn: \'' + this.props.arn + '\'') : '') + ' } }');
      this.gruntfile.registerTask('deploy', ['lambda_package', 'lambda_deploy']);
    }
  },
  install: function () {
    this.npmInstall();
  }

});
