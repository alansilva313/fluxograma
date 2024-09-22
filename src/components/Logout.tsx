export default function Logout() {
    const logout = () => {
        // Excluir o cookie do token
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        // Redirecionar para a página de login
        window.location.href = "login";
    }

    return (
        <>
            <div className="p-8">
            <p onClick={logout} style={{ cursor: 'pointer' }}>Sair</p>
            </div>
        </>
    );
}
