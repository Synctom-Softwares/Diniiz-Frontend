import Select from "./Select";
import Input from "./Input";
import AuthButton from "./buttons/AuthButton";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  checkButton,
  privacyPolicyText
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <>
            {getControlItem?.label &&
              <div className="flex justify-between text-[#666666]">
                <label className="text-left  font-inter">{getControlItem.label}</label>
                {getControlItem?.type == "password" && (
                  <div>
                    <p className=""><span>&#128065;</span> Hide</p>
                  </div>)
                }
              </div>}
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className={"py-6"}
            />
          </>
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >

          </Select>
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-2" key={controlItem.name}>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      {
        checkButton &&
        <div className="flex items-center gap-2">
          <div>
            <Input type="checkbox" id="privacyPolicy" />
          </div>
          <div>
            <label className="text-[11px] font-inter" for="privacyPolicy">{privacyPolicyText}</label>
          </div>
        </div>
      }

      <AuthButton disabled={isBtnDisabled} type="submit" className=" w-full mt-8 py-3 font-inter">
        {buttonText || "Submit"}
      </AuthButton>
    </form>
  );
}

export default CommonForm;
