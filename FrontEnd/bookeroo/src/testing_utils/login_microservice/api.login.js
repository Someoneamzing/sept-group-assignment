const POST_API_USERS_LOGIN = {
    'a@b.c': {
        REQ: {
            username: 'a@b.c',
            password: 'abc123',
        },
        RES: {
            authorities: ['PUBLIC'],
            success: true,
            token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6ImFkbWluIiwiaWQiOiIxIiwiZXhwIjoxNjMxNjcyNzgxLCJpYXQiOjE2MzE0NTY3ODEsInVzZXJuYW1lIjoiYUBiLmMifQ.E0I0Y9t_DVnC7oFPKPtVU_ClQTrVE4_P8vHZhxOebwo7JqlrKFaoWHP1pU-Etqoc-yunUmCkm-kO-7UU0o5zlg',
        },
    },
    'business@b.c': {
        REQ: {
            username: 'business@b.c',
            password: 'abc123',
        },
        RES: {
            authorities: ['PUBLIC', 'BUSINESS'],
            success: true,
            token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6ImFkbWluIiwiaWQiOiIxIiwiZXhwIjoxNjMxNjcyNzgxLCJpYXQiOjE2MzE0NTY3ODEsInVzZXJuYW1lIjoiYUBiLmMifQ.E0I0Y9t_DVnC7oFPKPtVU_ClQTrVE4_P8vHZhxOebwo7JqlrKFaoWHP1pU-Etqoc-yunUmCkm-kO-7UU0o5zlg',
        },
    },
    'admin@b.c': {
        REQ: {
            username: 'admin@b.c',
            password: 'abc123',
        },
        RES: {
            authorities: ['PUBLIC', 'ADMIN', 'BUSINESS'],
            success: true,
            token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6ImFkbWluIiwiaWQiOiIxIiwiZXhwIjoxNjMxNjcyNzgxLCJpYXQiOjE2MzE0NTY3ODEsInVzZXJuYW1lIjoiYUBiLmMifQ.E0I0Y9t_DVnC7oFPKPtVU_ClQTrVE4_P8vHZhxOebwo7JqlrKFaoWHP1pU-Etqoc-yunUmCkm-kO-7UU0o5zlg',
        },
    },
    BAD: {message: 'Bad credentials'},
};

export default POST_API_USERS_LOGIN;
