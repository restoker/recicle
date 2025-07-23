'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { confirmToken } from "@/server/actions/tokens";

const EmailVerificationForm = () => {
    const token = useSearchParams().get('token');
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerification = useCallback(async () => {
        if (success || error) return;

        if (!token) {
            setError('Token not found');
            setLoading(false);
            return;
        }

        setLoading(true);
        const resp = await confirmToken(token);

        if (!resp.ok) {
            setLoading(false);
            setError(resp.msg);
        }

        if (resp.ok) {
            setLoading(false);
            setSuccess(resp.msg);
            router.push('/auth/login')
        }

    }, []);

    useEffect(() => {
        handleVerification();
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className="flex items-center justify-center h-screen bg-white/5 backdrop-blur-md">
                        <p className="text-2xl font-bold text-green-950">Verificando...</p>
                    </div>
                ) : null
            }
            <div aria-hidden="true" className="relative rounded-lg">
                <img
                    alt=""
                    src="https://cdn.cosmos.so/50036259-a668-4602-b60a-d6a2c8bc9243?format=jpeg"
                    className="h-96 w-full object-cover object-center rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950" />
            </div>

            <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8" >
                <div className="mx-auto max-w-2xl text-center lg:max-w-4xl" >
                    {success ? <h2 className="text-3xl font-bold tracking-tight text-green-500 sm:text-4xl" > Cuenta activada </h2> : <h2 className="text-3xl font-bold tracking-tight text-red-500 sm:text-4xl" > Cuenta no activada </h2>}
                    {
                        error && <p className="mt-4 text-gray-200" > {error}
                        </p>
                    }
                    {
                        success && <p className="mt-4 text-gray-200" > {success}
                        </p>
                    }
                </div>

                {/* <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                           {features.map((feature) => (
                               <div key={feature.name} className="border-t border-gray-200 pt-4">
                                   <dt className="font-medium text-gray-900">{feature.name}</dt>
                                   <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                               </div>
                           ))}
                       </dl> */}
            </div>
        </>
    )
}

export default EmailVerificationForm