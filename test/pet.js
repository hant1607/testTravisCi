//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pets', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('', () => {
        it('it should GET all the pets', (done) => {
            chai.request(server)
                .get('/pets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
        it('should list a SINGLE pet on /pets/<id> GET', function(done) {
            chai.request(server)
            .get('/pets/09')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('pet');
                res.body.pet.should.be.a('object');
                res.body.pet.should.have.property('name');
                res.body.pet.should.have.property('status');
                res.body.pet.should.have.property('id');
                done();
            });
        });
        it('get a SINGLE pet but it dont have in list pets on /pets/<id> GET', function(done) {
            chai.request(server)
            .get('/pets/15')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Don\'t have this pet');
                done();
            });
        });
        it('should update a SINGLE pet with name on /pets/<id> PUT', function(done) {
            chai.request(server)
            .get('/pets')
            .end(function(err, res){
                chai.request(server)
                .put('/pets/09')
                .send({'name': 'Spider'})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.be.a('object');
                    res.body.pet.should.have.property('name');
                    res.body.pet.should.have.property('status');
                    res.body.pet.should.have.property('id');
                    res.body.pet.name.should.equal('Spider');
                    done();
                });
            });
        });
        it('should update a SINGLE pet with status on /pets/<id> PUT', function(done) {
            chai.request(server)
            .get('/pets')
            .end(function(err, res){
                chai.request(server)
                .put('/pets/09')
                .send({'status': 'unvalid'})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.be.a('object');
                    res.body.pet.should.have.property('name');
                    res.body.pet.should.have.property('status');
                    res.body.pet.should.have.property('id');
                    res.body.pet.status.should.equal('unvalid');
                    done();
                });
            });
        });
        it('should update a SINGLE pet with name and status on /pets/<id> PUT', function(done) {
            chai.request(server)
            .get('/pets')
            .end(function(err, res){
                chai.request(server)
                .put('/pets/09')
                .send({'name':'spider', 'status': 'unvalid'})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.be.a('object');
                    res.body.pet.should.have.property('name');
                    res.body.pet.should.have.property('status');
                    res.body.pet.should.have.property('id');
                    res.body.pet.name.should.equal('spider');
                    res.body.pet.status.should.equal('unvalid');
                    done();
                });
            });
        });
        it('should add a SINGLE pet on /pets POST', function(done) {
            chai.request(server)
            .post('/pets')
            .send({'id': '13', 'name': 'Kitty13', 'status': 'available'})
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('pet');
                res.body.pet.should.be.a('object');
                res.body.pet.should.have.property('name');
                res.body.pet.should.have.property('status');
                res.body.pet.should.have.property('id');
                res.body.pet.name.should.equal('Kitty13');
                res.body.pet.status.should.equal('available');
            done();
            });
        });
        it('should add a SINGLE pet dont have name and statu  /pets POST', function(done) {
            chai.request(server)
            .post('/pets')
            .send({})
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.equal('please input name and status');
            done();
            });
        });
        it('should delete a SINGLE pet on /pets POST', function(done) {
            chai.request(server)
            .delete('/pets/08')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.equal('Pet successfully deleted!');
                res.body.should.have.property('result');
                res.body.result.should.have.property('roweffected');
                res.body.result.roweffected.should.equal(1);
                
                // res.body.should.have.property('pet');
            done();
            });
        });
        it('should delete a SINGLE pet not in list pets on /pets POST', function(done) {
            chai.request(server)
            .delete('/pets/13')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('result');
                res.body.result.should.have.property('roweffected');
                res.body.result.roweffected.should.equal(0);
                
                // res.body.should.have.property('pet');
            done();
            });
        });
    });
});