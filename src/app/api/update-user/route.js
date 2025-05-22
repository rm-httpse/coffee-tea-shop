import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

export async function POST(request) {
  const { id, updatedData } = await request.json();

  const usersData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(usersData);

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  users[userIndex] = { ...users[userIndex], ...updatedData };
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ success: true, message: 'User information updated', user: users[userIndex] });
}
