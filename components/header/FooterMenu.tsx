import Icon from "$store/components/ui/Icon.tsx";

function FooterMenu() {
  return (
    <div class=" py-6 px-4 flex justify-between bg-[#F6F6F6] border-t border-[#E1E1E1]">
      <ul class="flex gap-4 flex-col ">
        <h2 class="uppercase text-xs font-bold ">MINHA CONTA</h2>
        <li>
          <a
            class="flex items-center gap-4 "
            href="https://www.deco.cx"
          >
            <Icon id="UserBlack" size={24} strokeWidth={1} />
            <span class="text-xs font-normal capitalize text-[#626262]">
              Fazer Login/Registrar
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 "
            href="/wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={1} fill="none" />
            <span class="text-xs font-normal capitalize text-[#626262]">
              Meus Favoritos
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 "
            href="https://www.deco.cx"
          >
            <Icon id="Truck" size={24} strokeWidth={1.5} />
            <span class="text-xs font-normal capitalize text-[#626262]">
              Meus Pedidos
            </span>
          </a>
        </li>
      </ul>
      <Icon class="pr-2" id="Pink" size={24} strokeWidth={2} />
    </div>
  );
}
export default FooterMenu;
