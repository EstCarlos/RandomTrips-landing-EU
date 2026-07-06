"use client";

const MIN_VIAJEROS = 1;
const MAX_VIAJEROS = 10;

export function ViajerosForm({
  viajeros,
  onChange,
  errors,
}: {
  viajeros: string[];
  onChange: (viajeros: string[]) => void;
  errors?: Record<number, string>;
}) {
  const cantidad = viajeros.length;

  function setCantidad(nueva: number) {
    const clamped = Math.min(MAX_VIAJEROS, Math.max(MIN_VIAJEROS, nueva));

    if (clamped > cantidad) {
      onChange([...viajeros, ...Array(clamped - cantidad).fill("")]);
    } else if (clamped < cantidad) {
      onChange(viajeros.slice(0, clamped));
    }
  }

  function setNombre(index: number, nombre: string) {
    const copia = [...viajeros];
    copia[index] = nombre;
    onChange(copia);
  }

  return (
    <div>
      <label className="block font-montserrat text-sm font-bold text-azul">
        Cantidad de viajeros
      </label>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCantidad(cantidad - 1)}
          disabled={cantidad <= MIN_VIAJEROS}
          className="flex size-10 items-center justify-center rounded-full bg-black/5 font-blur text-xl text-azul disabled:opacity-30"
          aria-label="Quitar viajero"
        >
          –
        </button>
        <span className="w-8 text-center font-montserrat text-lg font-bold text-azul">
          {cantidad}
        </span>
        <button
          type="button"
          onClick={() => setCantidad(cantidad + 1)}
          disabled={cantidad >= MAX_VIAJEROS}
          className="flex size-10 items-center justify-center rounded-full bg-black/5 font-blur text-xl text-azul disabled:opacity-30"
          aria-label="Agregar viajero"
        >
          +
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {viajeros.map((nombre, index) => (
          <div key={index}>
            <label
              htmlFor={`viajero-${index}`}
              className="block font-montserrat text-sm font-medium text-azul/80"
            >
              Nombre completo — Viajero {index + 1}
            </label>
            <input
              id={`viajero-${index}`}
              type="text"
              value={nombre}
              onChange={(event) => setNombre(index, event.target.value)}
              placeholder="Nombre y apellido"
              className={`mt-1 w-full rounded-xl border px-4 py-2.5 font-montserrat text-base text-ink outline-none focus:border-azul ${
                errors?.[index] ? "border-rojo-principal" : "border-black/15"
              }`}
            />
            {errors?.[index] && (
              <p className="mt-1 font-montserrat text-xs text-rojo-principal">
                {errors[index]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
