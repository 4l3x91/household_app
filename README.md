# household_app

Kravlista (4)

- [] En logga, splashscreen och appikon ska designas och användas. \*\*
- [x] Applikationen ska byggas med RN, Expo & TS. \*\*
- [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
      med produktägare, godkännas och dokumenteras. \*\*
- [x]Information ska kommuniceras till och från en server. (VG)

###

Hushåll (7)

- [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet \*
- [x] namnet ska gå att ändra. \*
- [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
- [x] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
- [x] En ägare ska kunna acceptera eller neka förfrågningar.
- [x] En ägare ska kunna göra andra till ägare.
- [x] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
      tas med i statistiken.
- [] Om en använder har pausats under en del av en period i statistiken ska graferna
  normaliseras.

1

Konto (5)

- [x] En användare ska kunna registrera och logga in sig. \*
- [x] En användare ska kunna skapa ett nytt hushåll. \*
- [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. \*
- [x] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
      godkänna användaren.
- [x] En användare ska kunna lämna ett hushåll.

####

Profil (6)

- [x] En användare ska kunna ange sitt namn. \*
- [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. \*
- [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. \*
- [] Avataren ska användas i appen för att visa vad användaren har gjort. \*
- [x] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).
- [x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
      olika hushållen.

Sysslor (6)

####

- [x] En ägare ska kunna lägga till sysslor att göra i hemmet. \*
- [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
      vikt som beskriver hur energikrävande den är. \*
- [] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
  ytterligare.
- [x] En ägare ska kunna redigera en syssla. \*
- [x] En ägare ska kunna ta bort en syssla.
- [] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
  också kommer att tas bort och få valet att arkivera sysslan istället.

  Dagsvyn (3)

- [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras.
- [] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad. \*
- [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. \*

Statistik (6)

- [] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
  hushåll. \*
- [] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
  fördelning av varje enskild syssla. \*
- [] Det ska finnas en statistikvy över ”nuvarande vecka”. \*
- [] Det ska finnas en statistikvy över ”förra vecka”.
- [] Det ska finnas en statistikvy över ”förra månaden”.
- [] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

Schemaläggning (3)

- [] En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
- [] Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.
- [] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
  hushållet och roteras baserat på ett intervall i dagar.
