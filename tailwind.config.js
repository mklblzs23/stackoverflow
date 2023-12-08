/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        nav: '#393939',
        background: '#2d2d2d',
        border: '#494c4f',
        tag: '#3d4951',
        answerTag: '#57705f',
        viewsTag: '#b19f5e',
        rowTitle: '#2f78af',
      },
    },
  },
  plugins: [],
}
