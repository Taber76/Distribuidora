// Register form for users, contacts and items

const FormRegister = ({ formDetails, handleChange, onSubmit, buttonText }) => {

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 w-2/3">
      {formDetails.map((input) => (
        <input
          className="bg-blue-100 text-xs rounded p-2"
          type={input.type}
          name={input.name}
          value={input.value}
          onChange={handleChange}
          required={input.required}
          placeholder={input.placeholder}
        />
      ))}

      <input type="submit" value={buttonText} className="btn btn-primary py-2 rounded bg-blue-500 text-white" />

    </form>

  )
};

export { FormRegister }