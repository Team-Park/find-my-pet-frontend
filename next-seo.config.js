import image from './src/static/image/banner.jpg'
// next-seo.config.js
const config = {
    title: "파인드마이펫",
    description: "파인드마이펫은 실종된 동물의 정보를 공유하여 찾을 수 있도록 도와주는 커뮤니티입니다. 실종 정보를 등록하고 실종 시 대처 가이드라인을 참고하세요.",
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: 'https://find-my-pet-frontend.vercel.app/',
      siteName: '파인드마이펫',
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
          type: 'image/jpg',
        },
      ],
    },
  };
  
  export default config;
  