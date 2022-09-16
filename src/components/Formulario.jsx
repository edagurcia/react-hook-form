import { useForm } from "react-hook-form";
import { edadValidator } from "./validadores";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const incluirTelefono = watch("incluirTelefono");

  return (
    <div>
      <h2>Formulario</h2>
      <p>Nombre: {watch("nombre")}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...register("nombre", { required: true, maxLength: 20 })}
          />
          {errors.nombre?.type === "required" && (
            <p style={{ color: "red" }}>El campo es requerido</p>
          )}
          {errors.nombre?.type === "maxLength" && (
            <p style={{ color: "red" }}>El campo es máximo de 20 caracteres</p>
          )}
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" {...register("direccion", { required: true })} />
          {errors.direccion?.type === "required" && (
            <p style={{ color: "red" }}>El campo es requerido</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            })}
          />
          {errors.email?.type === "required" && (
            <p style={{ color: "red" }}>El campo es requerido</p>
          )}
          {errors.email?.type === "pattern" && (
            <p style={{ color: "red" }}>Formato de Email es incorrecto</p>
          )}
        </div>
        <div>
          <label>Edad</label>
          <input
            type="text"
            {...register("edad", { validate: edadValidator })}
          />
          {errors.edad && (
            <p style={{ color: "red" }}>
              La edad debe estar entre 18 y 65 años
            </p>
          )}
        </div>
        <div>
          <label>País</label>
          <select name="pais" {...register("pais", { required: true })}>
            <option value="">-- Seleccione --</option>
            <option value="es">España</option>
            <option value="it">Italia</option>
            <option value="fr">Francia</option>
          </select>
        </div>
        <div>
          <label>¿Incluir Teléfono?</label>
          <input type="checkbox" {...register("incluirTelefono")} />
        </div>
        {incluirTelefono && (
          <div>
            <label>Teléfono</label>
            <input type="text" {...register("telefono", { maxLength: 8 })} />
          </div>
        )}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
