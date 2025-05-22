import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

export async function POST(request) {
  const { email, password } = await request.json();

  // Read existing users
  const usersData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(usersData);

  // Check if user exists
  const user = users.find((user) => user.email === email);

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  // Check password
  if (user.password !== password) {
    return NextResponse.json({ success: false, message: 'Incorrect password' }, { status: 401 });
  }

  // Successful login
  return NextResponse.json({ success: true, user }, { status: 200 });
}
