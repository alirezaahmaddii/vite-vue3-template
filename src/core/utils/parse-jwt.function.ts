export function parseJwt(token: string) {
    const jsonPayload = decodeURIComponent(
        atob(token)
            .split("")
            .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}