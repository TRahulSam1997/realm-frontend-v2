import db from '../../src/utils/db';

export default async (req, res) => {
  try {
    const users = await db.collection('users').orderBy('name').get();
    const usersData = users.docs.map(user => ({
      id: user.id,
      ...user.data()
    }));

    res.status(200).json({ usersData });
  } catch (e) {
    res.status(400).end();
  }
}