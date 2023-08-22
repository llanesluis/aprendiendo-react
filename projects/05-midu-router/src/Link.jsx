import { EVENTS } from './consts';

export function navigation(href) {
  window.history.pushState({}, '', href);

  //Creamos un evento que "escuche" cuando se ejecuta el window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  //Una vez creado el evento, falta "enviar" el evento <ESTO ACTIVA EL EVENTO, entonces puede ser escuchado>
  window.dispatchEvent(navigationEvent);
}

export default function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    //Configuracion de comportamiento
    const isMainEvent = event.button === 0; //Si fue ejecutado con el click primario
    const isModifiedEvent =
      event.metaKey || event.altKeyu || event.ctrlKey || event.shiftKey; //Si se presiono alguna de esas teclas al hacer click en el enlace
    const isManageableEvent = target === undefined || target === '_self';

    //Si el comportamiento es el default, se hara la navegacion en la pagina (Single Page App)
    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault(); //Evita que <a/> por default refresque la pagina
      navigation(to); //Navegacion con SPA
    }
  };

  //Un Anchor (<a/>) permite poder abrir ese enlace en otra ventana, un boton no
  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
