import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const nextLocale = cookies().get('NEXT_LOCALE')?.value;
    const locale = nextLocale ?? 'vi';

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
