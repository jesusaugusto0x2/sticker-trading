import { Button } from '@/components/ui';

function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#0F14198C',
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ComponentDocsPage() {
  return (
    <div
      style={{
        padding: '40px 32px',
        maxWidth: 800,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Button</h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        variant + color + size — icons are the consumer&apos;s responsibility.
      </p>

      {/* Variants */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Variants · color=&quot;default&quot;
        </h2>
        <Row label="primary">
          <Button variant="primary">Primary</Button>
        </Row>
        <Row label="secondary">
          <Button variant="secondary">Secondary</Button>
        </Row>
        <Row label="ghost">
          <Button variant="ghost">Ghost</Button>
        </Row>
        <Row label="danger">
          <Button variant="danger">Delete account</Button>
        </Row>
        <Row label="icon-only">
          <Button variant="icon-only" aria-label="Notifications">
            <BellIcon />
          </Button>
        </Row>
      </section>

      {/* Color green */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Variants · color=&quot;green&quot;
        </h2>
        <Row label="primary + green">
          <Button variant="primary" color="green">
            Confirm trade
          </Button>
        </Row>
        <Row label="secondary + green">
          <Button variant="secondary" color="green">
            View offer
          </Button>
        </Row>
        <Row label="ghost + green (color ignored)">
          <Button variant="ghost" color="green">
            Ghost stays neutral
          </Button>
        </Row>
        <Row label="danger + green (color ignored)">
          <Button variant="danger" color="green">
            Danger stays coral
          </Button>
        </Row>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Sizes
        </h2>
        <Row label="sm · 36px / 13px">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="primary" color="green" size="sm">
            Small green
          </Button>
        </Row>
        <Row label="md · 48px / 15px (default)">
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="primary" color="green" size="md">
            Medium green
          </Button>
        </Row>
        <Row label="lg · 56px / 17px">
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="primary" color="green" size="lg">
            Large green
          </Button>
        </Row>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          With icons
        </h2>
        <Row label="leftIcon">
          <Button variant="primary" leftIcon={<PlusIcon />}>
            Add sticker
          </Button>
          <Button variant="primary" color="green" leftIcon={<PlusIcon />}>
            Add sticker
          </Button>
        </Row>
        <Row label="rightIcon">
          <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
            View collection
          </Button>
          <Button
            variant="secondary"
            color="green"
            rightIcon={<ArrowRightIcon />}
          >
            View collection
          </Button>
        </Row>
        <Row label="icon-only">
          <Button variant="icon-only" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button variant="icon-only" aria-label="Notifications">
            <BellIcon />
          </Button>
          <Button variant="icon-only" aria-label="Delete">
            <TrashIcon />
          </Button>
        </Row>
      </section>

      {/* States */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          States
        </h2>
        <Row label="loading">
          <Button variant="primary" loading>
            Primary
          </Button>
          <Button variant="primary" color="green" loading>
            Green
          </Button>
          <Button variant="secondary" loading>
            Secondary
          </Button>
        </Row>
        <Row label="disabled">
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="primary" color="green" disabled>
            Green
          </Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="danger" disabled>
            Danger
          </Button>
          <Button variant="icon-only" disabled aria-label="Bell">
            <BellIcon />
          </Button>
        </Row>
      </section>

      {/* fullWidth */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          fullWidth
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" fullWidth>
            Full width primary
          </Button>
          <Button variant="primary" color="green" fullWidth>
            Full width green
          </Button>
          <Button variant="secondary" fullWidth>
            Full width secondary
          </Button>
        </div>
      </section>
    </div>
  );
}
