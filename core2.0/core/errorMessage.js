const message = {
  appNotAFunction : "Входной объект должен быть типа function",
  resultCallNotAObject: "Результат выполнения главной node не объект",
  useUnsupportedVariables: "Вы используете в объекте неподдерживаемые ключи",
  missTagOnObject: "Отсуствует `tag` в объекте",
  propsNotAObject: "Props не типа object",
  eventNotAFunction: "event не является функцией",
  incorrectPropsValue: "Не правильный тип для props",
  childNotArray: "Child могут храниться только как array",
  unsupportedTag: "Тип данных ребёнка не устраивает",
  unsupportedTagC: "Tag может хранить в себе либо string или function",
  usedFunctionTagWithChildren: "Если вы прописываете в tag component, тогда использовать детей невозможно",
  functionInTagReturn: "Функция в tag вернула не объект"
}

export default message;