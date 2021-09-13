import { Expense, User } from './expense'

let oso;

const initOso = async () => {
  const { Oso } = await import('oso')
  const oso = new Oso(); 
  await oso.registerClass(Expense, 'Expense')
  await oso.registerClass(User, 'User')                  // 2
  return oso;
}

const getOso = async () => {
  if (!oso) oso = await initOso();          // 4
  return oso;
};

export default getOso
