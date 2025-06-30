import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PrefixForm() {
  /*Este const es un hook de react-hook-form que nos permite manejar el formulario
  register es una funcion que nos permite registrar los inputs del formulario
  handleSubmit es una funcion que nos permite manejar el envio del formulario
  formState es un objeto que contiene el estado del formulario, como los errores */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  console.log(errors.amount); //Los errores se imprimen en la consola

  //Se define la constante navigate que se usa para redirigir al usuario a otra pagina
  const navigate = useNavigate();

  //Onsubmit es una funcion que se ejecuta cuando se envia el formulario
  const onSubmit = (data) => {
    alert(`Apertura de caja: $${data.amount}`); 
    console.log("Valor decimal:", data.amount); //El valor se imprime en la consola

    navigate("/login"); //Redirige al usuario a la pagina de login
  };




  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-6">
      <label>
        <h2 className="font-semibold mt-4 mb-8">Captura el importe inicial para la apertura de caja.</h2>
        <span className="font-semibold">Apertura de caja:</span>

        <div className="relative inline-block ml-3 ">
          <span className="absolute left-3 top-[5px] text-gray-600 pointer-events-none">$</span>
          <input
            type="number"
            step={0.01}  //Es para que deje ingresar decimales sin que salga el error de "El valor debe ser un número entero"
            placeholder="0.00"
            onChange={(e) => {
              setValue(e.target.value);
              setValue("amount", e.target.value);
            }}
            className="border border-gray-600 rounded w-40 p-1 pl-7"
            {...register("amount", {
              valueAsNumber: true,
              min:{
                value: 0.01,
                message: "El monto debe ser mayor a 0.01",
              },

              required: "El monto es requerido",
            })}
          />
        </div>

        {errors.amount && <p className="text-rojoFuerte mt-3">{"El monto es requerido"}</p>}
      </label>

      <div className="flex gap-6 mt-8 mr-6 items-center justify-end">
        <button
          type="button"
          className=" bg-rojoFuerte text-white py-1.5 px-5 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-azulOscuro text-white py-1.5 px-5 rounded-lg"
        >
          Abrir caja
        </button>
      </div>
    </form>
  );
}

//Error que tuve con el input que no me dejaba escribir, es porque el react-hook-form estaba 
// manejando el estado del input y no me dejaba escribir, por eso tuve que usar el useState para 
// manejar el estado del input y poder escribir en él. Para solucionar esto, se usa el setValue 
// de react-hook-form para actualizar el valor del input cuando se cambia el valor del input.