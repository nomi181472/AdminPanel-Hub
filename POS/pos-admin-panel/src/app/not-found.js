// Note: NotFound Page...!

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {

    // Note: Handeling navigation here...!
    const router = useRouter();

    // Note: When this component mounted then this hook will run...!
    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000);
    }, []);

    return (
        <div>
            <h1> Page Not Found! 😧 </h1>
        </div>
    );
};

export default NotFound;