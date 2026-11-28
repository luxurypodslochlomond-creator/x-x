// One query defines both the closed-panel count and the drawings inside it.
// $or counts a drawing only once if both its editorial reading and its sender match.
export default function goalQuery(goal) {
  const titles = goal.drawings.map(({ title }) => title);
  return { status: 'published', ...(titles.length ? { $or: [{ title: { $in: titles } }, { goal: goal.n }] } : { goal: goal.n }) };
}