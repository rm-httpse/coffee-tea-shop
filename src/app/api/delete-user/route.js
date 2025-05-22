import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

export async function POST(request) {
  const { id } = await request.json();

  const usersData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(usersData);

  const updatedUsers = users.filter(user => user.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));

  return NextResponse.json({ success: true, message: 'User deleted successfully' });
}
