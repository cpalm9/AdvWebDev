'use strict';
const cheerio               = require('cheerio');
const expect                = require('chai').expect;
const fs                    = require('fs');
const path                  = require('path');

describe('html-form-intro', function() {
    let html = '';
    let $ = null;
    let form = null;

    it('has form.html file', () => {
        html = fs.readFileSync(path.resolve(__dirname, '../form.html'), 'utf8');
    });

    it('can parse html file', () => {
        $ = cheerio.load(html);
    });

    it('has one form tag', () => {
        form = $('form');
        expect(form.length).to.equal(1);
    });

    describe('user', () => {

        it('input with name "user" exists', () => {
            expect(form.find('input[name="user"]').length).to.equal(1);
        });

        it('is a text input', () => {
            const input = form.find('input[name="user"]');
            const type = input.attr('type') || 'text';
            expect(type.toLowerCase()).to.equal('text');
        });

    });

    describe('user', () => {

        it('input with name "password" exists', () => {
            expect(form.find('input[name="password"]').length).to.equal(1);
        });

        it('is a text input', () => {
            const input = form.find('input[name="password"]');
            const type = input.attr('type') || 'text';
            expect(type.toLowerCase()).to.equal('password');
        });

    });

    describe('siblings', () => {

        it('input radio group "siblings" has 4 inputs', () => {
            expect(form.find('input[type="radio"][name="siblings"]').length).to.equal(4);
        });

        it('input radio group "siblings" has input with value "1"', () => {
            expect(form.find('input[type="radio"][name="siblings"][value="1"]').length).to.equal(1);
        });

        it('input radio group "siblings" has input with value "2"', () => {
            expect(form.find('input[type="radio"][name="siblings"][value="2"]').length).to.equal(1);
        });

        it('input radio group "siblings" has input with value "3"', () => {
            expect(form.find('input[type="radio"][name="siblings"][value="3"]').length).to.equal(1);
        });

        it('input radio group "siblings" has input with value "4+"', () => {
            expect(form.find('input[type="radio"][name="siblings"][value="4+"]').length).to.equal(1);
        });

    });

    describe('transportation', () => {
        let select = null;

        it('select named "transportation" exists', () => {
            select = form.find('select[name="transportation"]');
            expect(select.length).to.equal(1);
        });

        it('select named "transportation" has 4 options', () => {
            expect(select.find('option').length).to.equal(4);
        });

        describe('bus option', () => {

            it('value is "bus"', () => {
                expect(select.find('option[value="bus"]').length).to.equal(1);
            });

            it('displays "Bus"', () => {
                expect(select.find('option[value="bus"]').html()).to.equal('Bus');
            });

        });

        describe('bicycle option', () => {

            it('value is "bicycle"', () => {
                expect(select.find('option[value="bicycle"]').length).to.equal(1);
            });

            it('displays "Bicycle"', () => {
                expect(select.find('option[value="bicycle"]').html()).to.equal('Bicycle');
            });

        });

        describe('car option', () => {

            it('value is "car"', () => {
                expect(select.find('option[value="car"]').length).to.equal(1);
            });

            it('displays "Car"', () => {
                expect(select.find('option[value="car"]').html()).to.equal('Car');
            });

        });

        describe('other option', () => {

            it('value is "other"', () => {
                expect(select.find('option[value="other"]').length).to.equal(1);
            });

            it('displays "Other"', () => {
                expect(select.find('option[value="other"]').html()).to.equal('Other');
            });

        });

    });

    describe('done', () => {

        it('input with name "done" exists', () => {
            expect(form.find('input[name="done"]').length).to.equal(1);
        });

        it('is a checkbox', () => {
            expect(form.find('input[name="done"]').attr('type')).to.equal('checkbox');
        });

        it('has value "yes"', () => {
            expect(form.find('input[name="done"]').attr('value')).to.equal('yes');
        });

    });

    describe('submit', () => {

        it('has one button', () => {
            expect(form.find('button').length).to.equal(1);
        });

        it('button is of type "submit"', () => {
            expect(form.find('button[type="submit"]').length).to.equal(1);
        });

    });

});