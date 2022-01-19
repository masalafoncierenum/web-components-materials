import { Bet } from "../../models/bet";
import { User } from "../../models/user";

const template = document.createElement('template');
template.innerHTML = `
<div id="bets-page">
    <wcf-bet-list></wcf-bet-list>
    <wcf-starting-bet hidden></wcf-starting-bet>
    <wcf-bets-summary hidden></wcf-bets-summary>
</div>
`;

export class BetsPage extends HTMLElement {
    private bets: Bet[] = [];
    private startingBet: number | undefined;
    private user: User | undefined;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        window.addEventListener('UPDATE_BETS', ((event: Event) => this.updateBets(event as CustomEvent)).bind(this));
        window.addEventListener('UPDATE_STARTING_BET', ((event: Event) => this.updateStartingBet(event as CustomEvent)).bind(this));

        this.user = {
            firstname: 'Jack',
            lastname: 'Dupont',
            age: 47,
            hasIdentityVerified: true,
            isPrenium: false
        }
    }

    connectedCallback() {
        this.updateIsUserPrenium()
        this.toggleStartingBetDisplay();
        this.toggleSummaryDisplay();
    }

    updateBets(event: CustomEvent) {
        this.bets = event.detail.bets

        this.setBetsSummaryAttribute('bets', this.bets);
        this.toggleStartingBetDisplay();
    }

    updateStartingBet(event: CustomEvent) {
        this.startingBet = event.detail.startingBet;

        this.setBetsSummaryAttribute('startingbet', this.startingBet);
        this.toggleSummaryDisplay();
    }

    updateIsUserPrenium() {
        this.setBetsSummaryAttribute('isuserprenium', this.user!.isPrenium);
    }

    setBetsSummaryAttribute(key: string, value: unknown) {
        const betsSummaryElement = this.shadowRoot?.querySelector('wcf-bets-summary');

        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value)
        betsSummaryElement?.setAttribute(key, stringifiedValue);
    }

    toggleStartingBetDisplay() {
        const elementName = 'wcf-starting-bet';

        this.bets.length
            ? this.displayElement(elementName)
            : this.hideElement(elementName)
    }

    toggleSummaryDisplay() {
        const elementClass = 'wcf-bets-summary';

        this.startingBet && this.startingBet > 0 && this.bets.length
            ? this.displayElement(elementClass)
            : this.hideElement(elementClass)
    }

    hideElement(elementName: string) {
        const element = this.shadowRoot?.querySelector(elementName)!;
        element.setAttribute('hidden', '')
    }

    displayElement(elementName: string) {
        const element = this.shadowRoot?.querySelector(elementName)!;
        element.removeAttribute('hidden')
    }
}

customElements.define('wcf-bets', BetsPage);