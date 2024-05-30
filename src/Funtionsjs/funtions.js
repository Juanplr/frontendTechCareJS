export function getFechaActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const anio = hoy.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

export const get_session_time = (sessionTimeout, router) => {
    if (localStorage.getItem("token")) {
      console.log("existe token");
      setTimeout(() => {
        localStorage.clear();
        router.push("/");
      }, sessionTimeout);
    } else {
      router.push("/");
    }
  };