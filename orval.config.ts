// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  'jumoney-api': {
    input: {
      // 로컬 파일 경로 대신, 서버의 원본 스웨거 JSON 주소
      target: 'https://api.jumoney.site/v3/api-docs',
    },
    output: {
      httpClient: 'axios',
      mode: 'tags-split',
      target: 'src/api/generated/endpoints',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: 'src/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
