'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CIRCLES = [
  { id: 1, radius: 30, maxSpeed: 4 },
  { id: 2, radius: 40, maxSpeed: 4 },
  { id: 3, radius: 54, maxSpeed: 5 },
];

const START_POSITIONS = [
  { x: 60, y: 150 },
  { x: 150, y: 50 },
  { x: 240, y: 150 },
];

const KOSPI_IDS = [
  '005930',
  '000660',
  '035420',
  '035720',
  '005380',
  '051910',
  '000120',
  '000880',
  '000270',
  '003490',
  '003670',
  '004990',
  '005940',
  '024110',
  '030200',
  '034020',
  '105560',
  '086790',
  '090430',
  '139480',
  '251270',
  '267250',
  '271560',
  '103140',
  '069960',
  '051600',
  '014680',
  '010950',
  '007070',
  '005830',
  '006260',
];

const getUniqueRandomLogoId = (currentIds: string[]) => {
  const availableIds = KOSPI_IDS.filter((id) => !currentIds.includes(id));
  return availableIds.length > 0
    ? availableIds[Math.floor(Math.random() * availableIds.length)]
    : KOSPI_IDS[Math.floor(Math.random() * KOSPI_IDS.length)];
};

type Physics = { x: number; y: number; vx: number; vy: number };

export const FloatingLogoCircle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<Physics[]>([]);
  const lastCollisionTime = useRef<number>(0);

  const [logoIds, setLogoIds] = useState<string[]>(() =>
    KOSPI_IDS.slice(0, CIRCLES.length),
  );

  useEffect(() => {
    physicsRef.current = CIRCLES.map((_, i) => ({
      x: START_POSITIONS[i].x,
      y: START_POSITIONS[i].y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));

    const animate = () => {
      const physics = physicsRef.current;
      const width = containerRef.current?.clientWidth ?? 300;
      const height = 228;

      for (let i = 0; i < physics.length; i++) {
        const p = physics[i];
        const r = CIRCLES[i].radius;
        const maxS = CIRCLES[i].maxSpeed;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x - r < 0) {
          p.x = r;
          p.vx *= -1;
        } else if (p.x + r > width) {
          p.x = width - r;
          p.vx *= -1;
        }
        if (p.y - r < 0) {
          p.y = r;
          p.vy *= -1;
        } else if (p.y + r > height) {
          p.y = height - r;
          p.vy *= -1;
        }

        p.vx = Math.max(-maxS, Math.min(maxS, p.vx));
        p.vy = Math.max(-maxS, Math.min(maxS, p.vy));
      }

      for (let i = 0; i < physics.length; i++) {
        for (let j = i + 1; j < physics.length; j++) {
          const a = physics[i];
          const b = physics[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const minDist = CIRCLES[i].radius + CIRCLES[j].radius;

          if (dist < minDist) {
            const nx = (a.x - b.x) / dist;
            const ny = (a.y - b.y) / dist;
            const overlap = (minDist - dist) / 2;

            a.x += nx * overlap;
            a.y += ny * overlap;
            b.x -= nx * overlap;
            b.y -= ny * overlap;
            [a.vx, b.vx] = [b.vx, a.vx];
            [a.vy, b.vy] = [b.vy, a.vy];

            if (Date.now() - lastCollisionTime.current > 300) {
              lastCollisionTime.current = Date.now();
              setLogoIds((prev) => {
                const next = [...prev];
                next[i] = getUniqueRandomLogoId(
                  next.filter((_, idx) => idx !== i),
                );
                next[j] = getUniqueRandomLogoId(
                  next.filter((_, idx) => idx !== j),
                );
                return next;
              });
            }
          }
        }
      }

      for (let i = 0; i < physics.length; i++) {
        if (circleRefs.current[i]) {
          const x = Math.round(physics[i].x - CIRCLES[i].radius);
          const y = Math.round(physics[i].y - CIRCLES[i].radius);
          circleRefs.current[i]!.style.transform = `translate(${x}px, ${y}px)`;
        }
      }
      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative h-[228px] w-full overflow-hidden'
    >
      {CIRCLES.map((c, i) => (
        <div
          key={c.id}
          ref={(el) => {
            circleRefs.current[i] = el;
          }}
          className='absolute overflow-hidden rounded-full border-[0.5px] border-black/5 shadow-lg'
          style={{
            width: c.radius * 2,
            height: c.radius * 2,
            willChange: 'transform',
          }}
        >
          <Image
            src={`/logos/${logoIds[i]}.png`}
            alt='Logo'
            width={c.radius * 2}
            height={c.radius * 2}
            priority
            className='h-full w-full object-cover'
          />
        </div>
      ))}
    </div>
  );
};
