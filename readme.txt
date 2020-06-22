Начало работы:

	npm i - установка всех зависимостей

	npm run dev - компиляция всех source и установка watchers для дальнейшей компиляции

	npm run prod - компиляция всех source

Стркутура сборщика:

	gulp

		tasks //все задачи, выполняемые сборщиком. Каждой задаче соответствует свой файл.

			delete.js

			hotReload.js

			...			

		constants.js //константы, общие для разных tasks

	output //результат сборки

		fonts

		images

		scripts

		styles

		index.html

	source //исходники

		fonts /*Файлы переносятся в output/fonts без какой-либо модификации.
				Допустимые расширения файлов: .woff, .woff2, .css */

			somefont.woff

			somefont.woff2

			fonts.css

		images

			raster /*Папка для растровых изображений. Файлы переносятся в output/images/raster как есть,
					без дополнительной модификации*/

			vector /*Папка для векторных изображений. Файлы переносятся в output/images/vector как есть,
					без дополнительной модификации + создается вложенная папка 
					output/images/vector/sprites с svg-спрайтами*/

		scripts /* Точками входа являются файлы, расположенные на верхнем уровне - все они будут
					перенесены в output/scripts. Содержимое папок типа scripts/submodules перенесено не
					будет - эти файлы мы импортируем внутрь "точек входа":

						app.js

							import header from "./submodules/header.js"  
							
					За сборку js отвечает wepback, всем остальным занимается gulp
				*/

			submodules

				header.js

			app.js

			app2.js

		styles /* Точками входа являются файлы, расположенные на верхнем уровне - все они будут
					перенесены в output/styles. Содержимое вложенных директорий - abstract, base... -
					перенесено не будет - содержимое этих папок предназначено для импорта в точки входа:

						app.scss
							@import "abstract/abstract";
							@import "vendors/vendors";
							@import "base/base";
							@import "layout/layout";
							@import "components/components";
							@import "themes/themes";

					Структура папок создана на основе "The 7–1 Pattern"
					https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4
					
				*/

			abstract

				_abstract.scss //точка входа в папку со всеми импортами

				_functions.scss //функции

				_mixins.scss //миксины

				_variables.scss //переменные

			base

				_base.scss //точка входа в папку со всеми импортами

				_ground.scss //глобальные стили, глобальные контейнеры и т.д.

				_typography.scss //типографика	

			components

				_components.scss //точка входа в папку со всеми импортами

				_bem-block.scss /*независимый блок по БЭМ. Рекомендуется сразу дробить
									блоки по субдиректориям, чтобы избежать ситуации
									"100 файлов в одной папке" */

			layout

				_layout.scss //точка входа в папку со всеми импортами

				_header.scss

				_footer.scss

				...(и другие layout-стили)

			themes

				_themes.scss //точка входа в папку со всеми импортами

				_bright-theme.scss /*
									.page {
										&_bright {
											background: white;
										}
									}
								*/

			vendors

				_vendors.scss /*
									импорт стилей сторонних библиотек и плагинов, 
									не требующих модификации + содержимое vendors-extensions
								*/

				vendors-extensions

					_bootstrap.scss //импорт файлов bootstrap + переопределение bootstrap-переменных

					_vendors-extensions.scss //точка входа в папку со всеми импортами

			app.scss

			app2.scss

		templates /* Шаблоны сборки. Компиляция pug -> html производится
					только для файлов на верхнем уровне - index.pug, index2.pug
					Содержимое layout и т.д. предназначено для импорта:
							index.pug

								include layout/header.pug
								include layout/footer.pug
					*/

			data /*
						Все данные для шаблонов в формате json. Файлы в этой папке могут иметь
						любую глубину вложенности, независимо от этого сборщик
						создаст на их основе структуру вида:

						{
							[filename_without_extension]: fileContents
						}

						То есть из:

							subdirectory

								firstFile.json

									{
										"name":"Anton"
									}

							subdirectory2

								secondFile.json

									{
										"surname":"Rannala"
									}

							person.json

								{
									"profession":"frontend-developer"
								}


						Будет получен общий файл:

							{
								frstFile:{
									"name":"Anton"	
								},
								secondFile:{
									"surname":"Rannala"	
								},
								person:{
									"profession":"frontend-developer"
								}
							}

						...и передан задаче, собирающей шаблоны. Внутри шаблона
						обратиться к переменной можно будет так:

							p.
								#{person.profession}

					*/

				layout

					header.json

					footer.json

				globals.json

			layout

				footer.pug

				header.pug

			index.pug

			index2.pug	





