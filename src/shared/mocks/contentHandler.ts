import { http, HttpResponse } from 'msw'

export const contentHandlers = [
  http.get('/api/test', () => {
    return HttpResponse.json({
      success: true,
      message: 'MSW 연결 성공',
      result: {
        id: 1,
        name: 'test',
      },
    })
  }),
]