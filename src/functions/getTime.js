const getTime = (finalTime, initialTime) => {
  const time = finalTime - initialTime
  const calcMinutes = time / 1000 / 60;
  if (calcMinutes <= 60) {
    return `${Math.round(calcMinutes)} min`;
  } else {
    const calcHours = time / 1000 / 60 / 60;
    return `${Math.round(calcHours)} horas`;
  }
}
export default getTime;
