export const getDate = (dateString: string) => {
  const targetDate = new Date(dateString);
  const today = new Date();

  const timeDiffer = today.getTime() - targetDate.getTime();
  const dayDiffer = Math.floor(timeDiffer / (1000 * 60 * 60 * 24));

  if (dayDiffer === 0) {
    return "오늘";
  }

  return `${dayDiffer}일 전`;
};
