export const openSidebar = () => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
};

export const closeSidebar = () => {
  if (typeof document !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
};

export const toggleSidebar = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
};

type STATE_ID_MAP = {
  key: string;
};

export const STATE_ID_MAP = {
  Acre: 1,
  Alagoas: 2,
  Amazonas: 3,
  Amapá: 4,
  Bahia: 5,
  Ceará: 6,
  "Distrito Federal": 7,
  "Espírito Santo": 8,
  Goiás: 9,
  Maranhão: 10,
  "Minas Gerais": 11,
  "Mato Grosso do Sul": 12,
  "Mato Grosso": 13,
  Pará: 14,
  Paraíba: 15,
  Pernambuco: 16,
  Piauí: 17,
  Paraná: 18,
  "Rio de Janeiro": 19,
  "Rio Grande do Norte": 20,
  Rondônia: 21,
  Roraima: 22,
  "Rio Grande do Sul": 23,
  "Santa Catarina": 24,
  Sergipe: 25,
  "São Paulo": 26,
  Tocantins: 27,
};
