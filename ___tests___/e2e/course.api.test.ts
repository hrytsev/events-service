import {describe} from "node:test";
import supertest from "supertest";

import {app} from "../../src/app";
import {HTTP_STATUSES} from "../../src/utils/HTTP_STATUSES";

const request = supertest(app);
describe('/course ', () => {
    beforeAll(async () => {
        await request.delete('/__test__/data')
    })
    let course: any
    it('should return an empty array', async () => {
        await request
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200)
    })
    it('should create new course and return it', async () => {
        const title = 'test title'
        const createResponse = await request
            .post('/courses')
            .send({title})
            .expect(HTTP_STATUSES.CREATED_201)
        const createdCourse = createResponse.body;
        course=createdCourse;
        expect(createdCourse).toEqual(
            {
                title,
                id: expect.any(Number)
            }
        )
        const response = await request.get('/courses')
        const responseBody = response.body;
        expect(HTTP_STATUSES.OK_200);
        expect(responseBody).toEqual([{title: title, id: expect.any(Number)}]);
    })
    it('should return 404 for id 1 ', async () => {
        const res= await request.delete(`/courses/1`)
        expect(HTTP_STATUSES.NOT_FOUND_404)
    })
    it('should return array with one recently created course', async () => {
        const response = await request.get('/courses')
        expect(response.body).toEqual([course]);

    })
})