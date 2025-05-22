import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

export async function POST(request) {
  const newUser = await request.json();

  // Read existing users
  const usersData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(usersData);

  // Check if user already exists
  if (users.some((user) => user.email === newUser.email)) {
    return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
  }

  // Save new user
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ success: true, message: 'User registered successfully' });
}
