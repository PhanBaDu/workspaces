'use server';

import { cookies } from 'next/headers';

export default async function setLanguageValue(value: string) {
    cookies().set('NEXT_LOCALE', value);
}
