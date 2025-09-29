import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: 'kimchi-jjigae',
    title: '김치찌개',
    description: '집에서 쉽게 만드는 얼큰한 김치찌개',
    imageUrl: '/placeholder.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    category: '찌개/국물',
    tags: ['한식', '매운맛', '집밥', '간편'],
    rating: 4.8,
    author: '라온셰프',
    isPremium: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ingredients: [
      {
        id: 'ing-1',
        name: '신김치',
        amount: 200,
        unit: 'g',
        category: '채소',
        essential: true,
        coupangLink: 'https://coupang.com/kimchi'
      },
      {
        id: 'ing-2',
        name: '돼지고기 앞다리살',
        amount: 150,
        unit: 'g',
        category: '육류',
        essential: true
      },
      {
        id: 'ing-3',
        name: '대파',
        amount: 1,
        unit: '대',
        category: '채소',
        essential: false
      },
      {
        id: 'ing-4',
        name: '마늘',
        amount: 3,
        unit: '쪽',
        category: '향신료',
        essential: true
      },
      {
        id: 'ing-5',
        name: '고춧가루',
        amount: 1,
        unit: '큰술',
        category: '조미료',
        essential: true
      }
    ],
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: '재료 준비',
        description: '신김치는 한 입 크기로 썰고, 돼지고기는 먹기 좋은 크기로 자릅니다.',
        duration: 300,
        tips: ['김치는 너무 짜면 찬물에 살짝 헹궈주세요']
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: '고기 볶기',
        description: '팬에 기름을 두르고 돼지고기를 볶아줍니다.',
        duration: 300,
        temperature: 180
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: '김치 넣고 볶기',
        description: '볶은 고기에 김치를 넣고 함께 볶아줍니다.',
        duration: 300,
        tips: ['김치를 충분히 볶아야 깊은 맛이 납니다']
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: '물 넣고 끓이기',
        description: '물을 넣고 끓여줍니다. 고춧가루와 마늘을 넣어주세요.',
        duration: 900,
        timer: {
          id: 'timer-1',
          name: '끓이기',
          duration: 900,
          isActive: false,
          remainingTime: 900
        }
      }
    ],
    tips: [
      '김치는 충분히 익은 것을 사용하세요',
      '돼지고기 대신 참치나 햄을 사용해도 좋습니다',
      '마지막에 대파와 청양고추를 넣으면 더 맛있어요'
    ],
    nutritionInfo: {
      calories: 280,
      protein: 18,
      carbs: 12,
      fat: 16,
      fiber: 4,
      sodium: 1200
    }
  },
  {
    id: 'bulgogi',
    title: '불고기',
    description: '달콤짭짤한 전통 불고기',
    imageUrl: '/placeholder.jpg',
    youtubeId: 'abc123def456',
    cookingTime: 40,
    servings: 3,
    difficulty: 'medium',
    category: '구이/볶음',
    tags: ['한식', '달콤한맛', '특별한날', '고급'],
    rating: 4.9,
    author: '한식마스터',
    isPremium: true,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    ingredients: [
      {
        id: 'ing-6',
        name: '소고기 불고기용',
        amount: 300,
        unit: 'g',
        category: '육류',
        essential: true,
        coupangLink: 'https://coupang.com/beef'
      },
      {
        id: 'ing-7',
        name: '양파',
        amount: 1,
        unit: '개',
        category: '채소',
        essential: true
      },
      {
        id: 'ing-8',
        name: '당근',
        amount: 0.5,
        unit: '개',
        category: '채소',
        essential: false
      },
      {
        id: 'ing-9',
        name: '간장',
        amount: 3,
        unit: '큰술',
        category: '조미료',
        essential: true
      },
      {
        id: 'ing-10',
        name: '설탕',
        amount: 2,
        unit: '큰술',
        category: '조미료',
        essential: true
      }
    ],
    steps: [
      {
        id: 'step-5',
        stepNumber: 1,
        title: '고기 재우기',
        description: '소고기를 양념에 30분간 재워둡니다.',
        duration: 1800,
        timer: {
          id: 'timer-2',
          name: '재우기',
          duration: 1800,
          isActive: false,
          remainingTime: 1800
        }
      },
      {
        id: 'step-6',
        stepNumber: 2,
        title: '야채 준비',
        description: '양파와 당근을 썰어 준비합니다.',
        duration: 600
      },
      {
        id: 'step-7',
        stepNumber: 3,
        title: '볶기',
        description: '팬에 재운 고기와 야채를 넣고 볶아줍니다.',
        duration: 600,
        temperature: 200
      }
    ],
    tips: [
      '고기는 미리 냉동실에서 살짝 얼려두면 얇게 썰기 쉬워요',
      '배를 갈아 넣으면 고기가 더 부드러워집니다'
    ]
  },
  {
    id: 'doenjang-jjigae',
    title: '된장찌개',
    description: '구수한 된장찌개',
    imageUrl: '/placeholder.jpg',
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    category: '찌개/국물',
    tags: ['한식', '구수한맛', '집밥'],
    rating: 4.7,
    author: '집밥요리사',
    isPremium: false,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    ingredients: [
      {
        id: 'ing-11',
        name: '된장',
        amount: 2,
        unit: '큰술',
        category: '조미료',
        essential: true
      },
      {
        id: 'ing-12',
        name: '두부',
        amount: 150,
        unit: 'g',
        category: '단백질',
        essential: true
      },
      {
        id: 'ing-13',
        name: '감자',
        amount: 1,
        unit: '개',
        category: '채소',
        essential: false
      }
    ],
    steps: [
      {
        id: 'step-8',
        stepNumber: 1,
        title: '재료 썰기',
        description: '두부와 감자를 먹기 좋은 크기로 썹니다.',
        duration: 300
      },
      {
        id: 'step-9',
        stepNumber: 2,
        title: '끓이기',
        description: '물에 된장을 풀고 재료를 넣어 끓입니다.',
        duration: 900
      }
    ]
  }
];

export const sampleRecipes = recipes;

// 유틸리티 함수들
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (category: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === category);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getFeaturedRecipes = (): Recipe[] => {
  return recipes.filter(recipe => recipe.rating >= 4.8);
};

export const getPremiumRecipes = (): Recipe[] => {
  return recipes.filter(recipe => recipe.isPremium);
};

export const getRecentRecipes = (): Recipe[] => {
  return [...recipes].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};

export const getRandomRecipes = (count: number = 3): Recipe[] => {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRecipesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Recipe[] => {
  return recipes.filter(recipe => recipe.difficulty === difficulty);
};

export const getQuickRecipes = (maxTime: number = 30): Recipe[] => {
  return recipes.filter(recipe => recipe.cookingTime <= maxTime);
};
