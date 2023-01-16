import {
  Box,
  Center,
  Divider,
  FormControl,
  HStack,
  Input,
  Radio,
  Select,
  Spinner,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { connect } from "react-redux";
import { IVatCountry } from "./interfaces/vat.interface";
import { changeVat } from "./redux/slices/vat.slice";
import { AppDispatch, RootState } from "./redux/store";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IVatInputs } from "./interfaces/vat-input.interface";
import { getVats } from "./redux/trunks/vat.trunk";
import { vatSchema } from "./schemas/vat.schema";

interface IApp {
  items: IVatCountry[];
  isLoading: boolean;
  active?: IVatCountry;
  getAllVatItems: () => void;
  changeVatActive: (name: string) => void;
}

function App(props: IApp) {
  useEffect(() => {
    props.getAllVatItems();
  }, []);

  const [radiusValue, setRadiusValue] = React.useState("without");
  const [priceWithoutVat, setpriceWithoutVat] = React.useState(434.78);
  const [valueAddedTax, setValueAddedTax] = React.useState(100);
  const [priceIncludedVat, setPriceIncludedVat] = React.useState(0);
  const [radiusTax, setRadiusTax] = React.useState(0);

  const { control } = useForm<IVatInputs>({
    resolver: yupResolver(vatSchema),
    shouldFocusError: false,
    mode: "all",
    defaultValues: {
      priceWithoutVat,
      valueAddedTax,
      priceIncludedVat,
    },
  });

  const changeGroupVatRate = (i: string) => {
    const index = parseInt(i);
    const value = props.active?.vats[index].value ?? 0;
    calc(value);
    setRadiusTax(value);
  };

  const calc = (valueTax?: number) => {
    setPriceIncludedVat(
      priceWithoutVat * (valueTax ? valueTax / 100 : radiusTax / 100) +
        (priceWithoutVat - valueAddedTax)
    );
  };

  return (
    <Center bg="white" height="100vh">
      <Box bg="primary.800:alpha.5" p="5" rounded="lg" w={"500"}>
        {props.isLoading ? (
          <Spinner size="lg" py={20} />
        ) : (
          <>
            <HStack justifyContent={"space-between"} alignItems="center">
              <FormControl.Label>Country</FormControl.Label>
              <Select
                minWidth="30"
                placeholder="Select a country"
                selectedValue={props.active?.name}
                onValueChange={props.changeVatActive}
              >
                {props.items?.map((item, key) => (
                  <Select.Item key={key} label={item.name} value={item.name} />
                ))}
              </Select>
            </HStack>

            <Divider my={5} />

            {props.active ? (
              <>
                <HStack justifyContent={"space-between"} alignItems="center">
                  <FormControl.Label>VAT rate</FormControl.Label>
                  <Radio.Group
                    name="VatRate"
                    minWidth={30}
                    defaultValue="0"
                    onChange={(i) => changeGroupVatRate(i)}
                  >
                    <HStack
                      justifyContent={"space-between"}
                      alignItems="center"
                      space={5}
                    >
                      {props.active?.vats.map((vat, key) => (
                        <Radio
                          key={key}
                          value={key.toString()}
                        >{`${vat.value.toString()}%`}</Radio>
                      ))}
                    </HStack>
                  </Radio.Group>
                </HStack>

                <Divider my={5} />
              </>
            ) : null}

            <HStack
              justifyContent={"space-between"}
              alignItems="center"
              w={"md"}
            >
              <Radio.Group
                space="5"
                name="vatRadioGroup"
                accessibilityLabel="favorite number"
                justifyContent={"space-between"}
                flexDirection={"column"}
                value={radiusValue}
                onChange={(nextValue) => {
                  setRadiusValue(nextValue);
                }}
              >
                <Radio value="without">Price without VAT</Radio>
                <Radio value="add">Value-Added Tax</Radio>
                <Radio value="included">Price incl. VAT</Radio>
              </Radio.Group>

              <FormControl w={"50%"} isInvalid>
                <VStack space="2">
                  <Controller
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Input
                          isDisabled={radiusValue !== "without"}
                          onBlur={() => {
                            onBlur();
                            calc();
                          }}
                          onChangeText={(i) => {
                            onChange(i);
                            setpriceWithoutVat(parseFloat(i));
                          }}
                          value={value.toString()}
                        />
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          {error?.message}
                        </FormControl.ErrorMessage>
                      </>
                    )}
                    name="priceWithoutVat"
                  />

                  <Controller
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Input
                          isDisabled={radiusValue !== "add"}
                          onBlur={() => {
                            onBlur();
                            calc();
                          }}
                          onChangeText={(i) => {
                            onChange(i);
                            setValueAddedTax(parseFloat(i));
                          }}
                          value={value.toString()}
                        />
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          {error?.message}
                        </FormControl.ErrorMessage>
                      </>
                    )}
                    name="valueAddedTax"
                  />

                  <Controller
                    control={control}
                    render={({ field: { onBlur }, fieldState: { error } }) => (
                      <>
                        <Input
                          isDisabled={radiusValue !== "included"}
                          onBlur={onBlur}
                          value={priceIncludedVat.toFixed(2).toString()}
                        />
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          {error?.message}
                        </FormControl.ErrorMessage>
                      </>
                    )}
                    name="priceIncludedVat"
                  />
                </VStack>
              </FormControl>
            </HStack>
          </>
        )}
      </Box>
    </Center>
  );
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.vat.isLoading,
  items: state.vat.items,
  active: state.vat.active,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getAllVatItems: () => dispatch(getVats()),
  changeVatActive: (name: string) => dispatch(changeVat(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
