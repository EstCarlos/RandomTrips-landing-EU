export type Host = {
  id: string;
  nombre: [string, string];
  foto: string | null; // TODO: foto real de cada host
};

export const hosts: Host[] = [
  {
    id: "bernat",
    nombre: ["Bernat", "Moreno"],
    foto: null,
  },
  {
    id: "randy",
    nombre: ["Randy", "García"],
    foto: null,
  },
];

// TODO: bio real de los hosts — placeholder de maquetación mientras llega el copy
export const bioHosts = [
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
  "Dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure.",
];
