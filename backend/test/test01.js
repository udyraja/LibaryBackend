//reference- http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('projects', function() {
    it('should list ALL projects on /projects GET', function (done) {
        chai.request(server)
            .get('/blobs')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

///get all users

    it('should add a SINGLE blob on /user POST', function (done) {
        chai.request(server)
            .post('/user')
            .send({'username': 'Java', 'name': 'Script', 'email': 'udyraja@gmail.com'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('username');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.should.have.property('email');
                res.body.SUCCESS.should.have.property('_id');
                /* res.body.SUCCESS.name.should.equal('Java');
                 res.body.SUCCESS.lastName.should.equal('Script');*/
                done();
            });
    });

    it('should list a SINGLE project on /projects/<id> GET', function (done) {
        var newProjects = new projects({
            "projectName": "hhhh",
            "projectDescription": "werwrwr",
            "projectOwner": "me",
            "Private": "true",
            "projectField": "ddd",
            "createdAt": "16/05/2018",
            "updatedAt": "15/05/2019"
        });
        newProjects.save(function (err, data) {
            chai.request(server)
                .get('/projects/' + data.id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('projectName');
                    res.body.should.have.property('projectDescription');
                    res.body.name.should.equal('hhhh');
                    res.body.lastName.should.equal('werwrwr');
                    res.body._id.should.equal(data.id);
                    done();
                });
        });
    });
    it('should update a SINGLE project on /project/<id> PUT', function(done) {
        chai.request(server)
            .get('/projects')
            .end(function(err, res){
                chai.request(server)
                    .put('/projects/'+res.body[0]._id)
                    .send({'projectName': 'Spider'})
                    .end(function(error, response){
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('UPDATED');
                        response.body.UPDATED.should.be.a('object');
                        response.body.UPDATED.should.have.property('projectName');
                        response.body.UPDATED.should.have.property('_id');
                        response.body.UPDATED.name.should.equal('Spider');
                        done();
                    });
            });
    });
    it('should delete a SINGLE project on /projects/<id> DELETE', function(done) {
        chai.request(server)
            .get('/projects')
            .end(function(err, res){
                chai.request(server)
                    .delete('/projects/'+res.body[0]._id)
                    .end(function(error, response){
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('REMOVED');
                        response.body.REMOVED.should.be.a('object');
                        response.body.REMOVED.should.have.property('projectName');
                        response.body.REMOVED.should.have.property('_id');
                        response.body.REMOVED.name.should.equal('Bat');
                        done();
                    });
            });
    });

});

