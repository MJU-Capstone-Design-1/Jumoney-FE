import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { QuizClient, QuizQuestion } from './quizClient';

const parseQuizMarkdown = (markdown: string): QuizQuestion[] => {
  return markdown
    .split(/\n(?=문제\s+\d+\.)/)
    .map((block) => block.trim())
    .filter((block) => block.startsWith('문제'))
    .map((block) => {
      const answerMatch = block.match(/\*\*정답:\*\*\s*(.+)$/m);
      const answerRaw = answerMatch?.[1]?.trim() ?? '';
      const content = answerMatch
        ? block.slice(0, answerMatch.index).trim()
        : block;
      const [titleLine = '', ...optionLines] = content.split('\n');
      const question = titleLine.replace(/^문제\s+\d+\.\s*/, '').trim();
      const numberedOptions = optionLines
        .map((line) => line.match(/^\s*(\d+)\.\s+(.+)$/))
        .filter((match): match is RegExpMatchArray => Boolean(match))
        .map((match) => match[2].trim());
      const oxOptions = optionLines
        .map((line) => line.match(/^\s*-\s*([OX])\s*$/i))
        .filter((match): match is RegExpMatchArray => Boolean(match))
        .map((match) => match[1].toUpperCase());
      const options = numberedOptions.length > 0 ? numberedOptions : oxOptions;
      const numberedAnswer = answerRaw.match(/^(\d+)\s*(?:\((.+)\))?/);
      const textAnswer = answerRaw.match(/^(.+?)(?:\s*\((.+)\))?$/);

      return {
        question,
        options,
        answerText:
          numberedAnswer?.[2]?.trim() || textAnswer?.[1]?.trim() || answerRaw,
        correctOptionIndex: numberedAnswer
          ? Number(numberedAnswer[1]) - 1
          : options.findIndex(
              (option) =>
                option.toLowerCase() ===
                (textAnswer?.[1]?.trim() ?? answerRaw).toLowerCase(),
            ),
      };
    });
};

export default async function QuizPage() {
  const markdown = await readFile(path.join(process.cwd(), 'quiz.md'), 'utf-8');
  const questions = parseQuizMarkdown(markdown);

  return <QuizClient questions={questions} />;
}
