import React from 'react'

export default [
    {
      id: 1,
      question: "What type of climate do you like?",
      answers: {
          answerFukuoka: "As hot as possible!",
          answerTottori: "A nice breeze on a hot day",
          answerAomori: "Nothing over 25 degrees please!",
          answerHokkaido: "As chilly as can be",
          answerHiroshima: "A mild, comfortable temperature",
          answerOsaka: "Cool wind and varying weather",
          answerKobe: "Seabreeze and cool weather",
      }
    },
    {
      id: 2,
      question: "What is your favorite pastime?",
      answers: [
          "Skiing", // Hokkaido
          "Going out for food with friends", // Osaka
          "Hanging out at the beach", // Fukuoka
          "Making trips to small neighboring destinations", // Tottori
          "Going for a river boat ride or to museums", // Hiroshima
          "Spending time at shopping malls", // Kobe
          "Going on a hike", // Aomori
      ]
    },
    {
      id: 3,
      question: "What is your favorite food (out of the options)?",
      answers: [
          "Noodles", // Hiroshima
          "Fish dishes", // Aomori
          "I cannot chose one, I have too many", // Osaka
          "Ramen or chicken skewers", // Fukuoka
          "Beef", // Kobe
          "Seafood", // Tottori
          "Sushi and Sashimi", // Hokkaido
      ]
    },
    {
      id: 4,
      question: "What type of scenery do you prefer?",
      answers: [
          "Mountainous", // Aomori, Hokkaido
          "Sea and Mountains", // Kobe, Fukuoka
          "Seaside and Desert", // Tottori
          "Flat with mountains seen in the distance", // Osaka and Hiroshima
      ]
    },
    {
        id: 4,
        question: "Do you prefer a lively/vibrant place or a relaxing, calm atmosphere?",
        answers: [
            // Osaka
            "Super lively!",
            // Tottori, Aomori, Hiroshima
            "Quiet and calm",
            // Fukuoka, Kobe, Hokkaido
            "A mixture of both",
        ]
    },
    {
        id: 5,
        question: "How far from Tokyo airport would you be willing to go?",
        answers: [
            // Osaka, Kobe, Hiroshima
            "2-3 hours",
            // Tottori, Aomori
            "up to 5 hours",
            // Fukuoka, Hokkaido
            "Another flight, or long trainride would be fine!",
        ]
    }
]