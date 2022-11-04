<p align=center>
<img src="https://user-images.githubusercontent.com/90193907/199990152-616b79ea-161f-4aa4-aa61-daba35b24b8a.png"/>
</p>

### Welcome to Hushållet!

Made in React Native, Hushållet helps you organize and distribute chores throughout members of your household! Easily keep track of what needs doing and who has done what to minimize those arguments we all know too well!

## Content

- <a href="#how-to-run">How to run the project</a>
- <a href="#requirements">Requirements</a>

# <div id="how-to-run">How to run</div>

## Requirements to set up

```
node.js
npm
```

## Set up and run

```
npm install --force
npm start
```

# <div id="requirements">Requirements</div>

✅ En logga, splashscreen och appikon ska designas och användas.

✅ Applikationen ska byggas med RN, Expo & TS.

✅ Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
med produktägare, godkännas och dokumenteras.

✅ Information ska kommuniceras till och från en server.

###

## Hushåll

✅ Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet.

✅ namnet ska gå att ändra.

✅ Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.

✅ En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.

✅ En ägare ska kunna acceptera eller neka förfrågningar.

✅ En ägare ska kunna göra andra till ägare.

✅ En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
tas med i statistiken.

❌ Om en använder har pausats under en del av en period i statistiken ska graferna
normaliseras.

## Konto

✅ En användare ska kunna registrera och logga in sig.

✅ En användare ska kunna skapa ett nytt hushåll.

✅ En användare ska kunna gå med i ett hushåll genom att ange hushållets kod.

✅ När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
godkänna användaren.

✅ En användare ska kunna lämna ett hushåll.

####

## Profil

✅ En användare ska kunna ange sitt namn.

✅ En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista.

✅ Valda avatarer ska inte kunna väljas av andra användare i hushållet.

✅ Avataren ska användas i appen för att visa vad användaren har gjort.

✅ En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).

✅ Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
olika hushållen.

## Sysslor

####

✅ En ägare ska kunna lägga till sysslor att göra i hemmet.

✅ En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
vikt som beskriver hur energikrävande den är.

✅ En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
ytterligare.

✅ En ägare ska kunna redigera en syssla.

✅ En ägare ska kunna ta bort en syssla.

✅ När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
också kommer att tas bort och få valet att arkivera sysslan istället.

## Dagsvyn

✅ Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras.

✅ Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad.

✅ När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord.

## Statistik

✅ En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
hushåll.

✅ Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
fördelning av varje enskild syssla.

✅ Det ska finnas en statistikvy över ”nuvarande vecka”.

✅ Det ska finnas en statistikvy över ”förra vecka”.

✅ Det ska finnas en statistikvy över ”förra månaden”.

✅ Om det inte finns statistik för en av vyerna ska den vyn inte visas.

## Schemaläggning

✅ En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.

✅ Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.

❌ En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
hushållet och roteras baserat på ett intervall i dagar.
