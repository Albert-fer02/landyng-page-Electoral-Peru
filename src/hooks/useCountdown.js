import { useState, useEffect } from "react";

/**
 * Hook que calcula el tiempo restante hasta una fecha objetivo
 * @param {Date} targetDate - Fecha objetivo (elecciones)
 * @returns {Object} { days, hours, minutes, seconds, isExpired }
 */
export function useCountdown(targetDate) {
  const calculateTimeLeft = () => {
    // Fecha objetivo en hora de Perú (UTC-5)
    // Las elecciones son 12 de abril 2026 a las 8:00 AM hora Perú
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
