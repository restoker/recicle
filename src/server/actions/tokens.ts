'use server'

export const confirmToken = async (token: string) => {
    try {
        const resp = await fetch(`http://localhost:3001/users/verification?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await resp.json();
        if (data.statusCode) {
            if (data.message === 'Validation failed (uuid is expected)') {
                return { ok: false, msg: 'El formato del token no es valido' };
            };

            return { ok: false, msg: data.message };
        }
        if (data.ok) {
            return { ok: true, msg: data.msg };
        }
        return { ok: false, msg: data.msg };
    } catch (e) {
        if (e instanceof Error) {
            if (e instanceof TypeError) {
                if (e.message === 'fetch failed') {
                    return { ok: false, msg: 'No se pudo conectar con el servidor' };
                }
                return { ok: false, msg: 'No se pudo verificar el token' };
            }
            return { ok: false, msg: e.message };
        } else {
            return { ok: false, msg: 'No se pudo verificar el token' };
        }
    }
}