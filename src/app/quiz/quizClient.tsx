'use client';

import BackButtonField from '@/components/backButtonField';
import BottomButton from '@/components/bottomButton';
import { SurveyStepper } from '@/components/surveyStepper';
import { SurveyOption } from '@/features/recommend/survey/surveyFirstListGroup';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  answerText: string;
  correctOptionIndex: number;
}

const QUESTION_COUNT = 3;

const normalizeAnswer = (value: string) =>
  value.replace(/\s+/g, '').trim().toLowerCase();

const shuffle = <T,>(items: T[]) => {
  const copied = [...items];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
};

interface QuizClientProps {
  questions: QuizQuestion[];
}

export const QuizClient = ({ questions }: QuizClientProps) => {
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [typedAnswer, setTypedAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = selectedQuestions[currentIndex];
  const hasOptions = currentQuestion?.options.length > 0;
  const canSubmit = hasOptions
    ? selectedOptionIndex !== null
    : typedAnswer.trim().length > 0;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSelectedQuestions(shuffle(questions).slice(0, QUESTION_COUNT));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [questions]);

  const handleNext = () => {
    if (!currentQuestion || !canSubmit) return;

    const isCorrect = hasOptions
      ? selectedOptionIndex === currentQuestion.correctOptionIndex
      : normalizeAnswer(typedAnswer) ===
        normalizeAnswer(currentQuestion.answerText);

    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }

    if (currentIndex === selectedQuestions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedOptionIndex(null);
    setTypedAnswer('');
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (questions.length === 0) {
    return (
      <div className='flex min-h-screen w-full flex-col px-4 pt-4'>
        <BackButtonField color='secondary2' label='주머니 퀴즈' href='/' />
        <div className='flex flex-1 items-center justify-center text-center'>
          <p className='text-body-xl text-text-sub font-extrabold'>
            준비된 퀴즈가 없습니다.
          </p>
        </div>
      </div>
    );
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className='flex min-h-screen w-full flex-col px-4 pt-4'>
        <BackButtonField color='secondary2' label='주머니 퀴즈' href='/' />
        <div className='flex flex-1 items-center justify-center text-center'>
          <p className='text-body-xl text-text-sub font-extrabold'>
            퀴즈를 준비하고 있어요.
          </p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className='flex min-h-screen w-full flex-col px-4 pt-4 pb-[10rem]'>
        <BackButtonField color='secondary2' label='주머니 퀴즈' href='/' />
        <div className='flex flex-1 flex-col items-center justify-center gap-[2rem] text-center'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-label-lg leading-[120%] font-extrabold'
          >
            3문제 중
            <br />
            {correctCount}개를 맞췄어요
          </motion.p>
          <p className='text-body-lg text-text-sub font-bold'>
            다시 풀면 새로운 문제가 랜덤으로 나와요.
          </p>
        </div>
        <BottomButton label='다시 풀기' onClick={handleRestart} />
      </div>
    );
  }

  return (
    <div className='flex min-h-screen w-full flex-col px-4 pt-4 pb-[10rem]'>
      <BackButtonField color='secondary2' label='주머니 퀴즈' href='/' />
      <SurveyStepper
        currentStep={currentIndex + 1}
        totalSteps={selectedQuestions.length}
      />

      <div className='flex flex-col items-center gap-[3rem] pt-[2rem]'>
        <motion.p
          key={currentQuestion.question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-label-md flex text-center leading-[130%] font-extrabold'
        >
          {currentQuestion.question}
        </motion.p>

        {hasOptions ? (
          <div className='flex w-full flex-col gap-[0.5rem]'>
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={`${currentQuestion.question}-${option}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <SurveyOption
                  label={option}
                  isSelected={selectedOptionIndex === index}
                  onClick={() => setSelectedOptionIndex(index)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className='w-full'
          >
            <input
              value={typedAnswer}
              onChange={(event) => setTypedAnswer(event.target.value)}
              placeholder='정답을 입력해주세요'
              className='text-body-xl bg-secondary1 text-secondary2 shadow-card-shadow placeholder:text-text-sub h-[5rem] w-full rounded-[1.5rem] px-[1rem] font-bold outline-none'
            />
          </motion.div>
        )}
      </div>

      <BottomButton
        label={
          currentIndex === selectedQuestions.length - 1
            ? '결과 보기'
            : '다음으로'
        }
        disabled={!canSubmit}
        onClick={handleNext}
      />
    </div>
  );
};
